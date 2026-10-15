import importlib.util
import json
from pathlib import Path
import sys
import unittest
from unittest.mock import MagicMock, patch


class MannequinsTest(unittest.TestCase):
    def setUp(self):
        self.table = MagicMock()
        boto3 = MagicMock()
        boto3.resource.return_value.Table.return_value = self.table
        path = Path(__file__).parents[1] / 'lambda' / 'MannequinsFunction.py'
        spec = importlib.util.spec_from_file_location('mannequins_under_test', path)
        self.module = importlib.util.module_from_spec(spec)
        with patch.dict(sys.modules, {'boto3': boto3}):
            spec.loader.exec_module(self.module)

    def test_reads_all_pages_for_authenticated_user(self):
        key = {'userId': 'user', 'mannequinName': 'a'}
        self.table.query.side_effect = [
            {'Items': [{'mannequinName': 'a', 'statusFields': {}}], 'LastEvaluatedKey': key},
            {'Items': [{'mannequinName': 'b', 'statusFields': {}}]},
        ]
        result = self.module.lambda_handler({
            'requestContext': {'authorizer': {'claims': {'sub': 'user'}}}
        }, None)
        self.assertEqual(result['statusCode'], 200)
        self.assertEqual([item['mannequinName'] for item in json.loads(result['body'])], ['A', 'B'])
        self.assertEqual(self.table.query.call_count, 2)
        self.assertEqual(self.table.query.call_args.kwargs['ExclusiveStartKey'], key)
        self.assertEqual(self.table.query.call_args.kwargs['ExpressionAttributeValues'], {':user_id': 'user'})

    def test_missing_identity_is_rejected_without_query(self):
        result = self.module.lambda_handler({}, None)
        self.assertEqual(result['statusCode'], 403)
        self.table.query.assert_not_called()

    def test_failure_on_later_page_does_not_return_partial_success(self):
        self.table.query.side_effect = [
            {'Items': [], 'LastEvaluatedKey': {'userId': 'user', 'mannequinName': 'a'}},
            RuntimeError('database unavailable'),
        ]
        result = self.module.lambda_handler({
            'requestContext': {'authorizer': {'claims': {'sub': 'user'}}}
        }, None)
        self.assertEqual(result['statusCode'], 500)


if __name__ == '__main__':
    unittest.main()
