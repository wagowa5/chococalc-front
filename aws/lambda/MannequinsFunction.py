import json
import boto3
# DynamoDBクライアントの初期化
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('LocalChococalc')

def lambda_handler(event, context):
    # API Gatewayからのリクエストコンテキストを取得
    request_context = event.get('requestContext', {})
    
    # Cognito認証情報を含むオーソライザー情報を取得
    authorizer = request_context.get('authorizer', {})
    
    # Cognito User Poolからのclaimsを取得
    claims = authorizer.get('claims', {})
    
    # CognitoのuserId（sub）を取得
    user_id = claims.get('sub', 'Unknown user')
    # userIdが取得できなかった場合、エラーレスポンスを返す
    if not user_id:
        return {
            'statusCode': 403,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,DELETE'
            },
            'body': json.dumps({'message': 'Unauthorized: User ID not found'})
        }

    # テーブルからデータをスキャンする
    try:
        # userIdをパーティションキーとして使用してデータを取得
        response = table.query(
            KeyConditionExpression='userId = :user_id',
            ExpressionAttributeValues={
                ':user_id': user_id
            }
        )
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
