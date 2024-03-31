import json
import boto3

def lambda_handler(event, context):
    # DynamoDBクライアントの初期化
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('LocalChococalc')

    # テーブルからデータをスキャンする
    try:
        response = table.scan()
        items = response['Items']
        
        filtered_items = [
            {'mannequinName': item['mannequinName'].upper(), 'statusFields': item['statusFields']}
            for item in items
            if 'mannequinName' in item and 'statusFields' in item
        ]
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(filtered_items)
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'message': 'Internal Server Error'})
        }
