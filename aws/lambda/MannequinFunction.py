import json
import boto3

def lambda_handler(event, context):
    # DynamoDBクライアントの初期化
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('LocalChococalc')
    
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
    
    # リクエストメソッドの取得
    http_method = event['httpMethod']
    
    if http_method == 'POST':
        # POSTリクエストの処理
        try:
            body = json.loads(event['body'])
            response = table.put_item(
                Item={
                    'userId': user_id,
                    'mannequinName': body['mannequinName'].upper(),
                    'statusFields': body['statusFields']
                }
            )
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,DELETE'
                },
                'body': json.dumps({'message': 'Item Created'})
            }
        except Exception as e:
            print(e)
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,DELETE'
                },
                'body': json.dumps({'message': 'Internal Server Error'})
            }

    elif http_method == 'DELETE':
        # DELETEリクエストの処理
        try:
            query_params = event['queryStringParameters']
            response = table.delete_item(
                Key={
                    'userId': user_id,
                    'mannequinName': query_params['mannequinName'].upper()
                }
            )
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,DELETE'
                },
                'body': json.dumps({'message': 'Item Deleted'})
            }
        except Exception as e:
            print(e)
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,DELETE'
                },
                'body': json.dumps({'message': 'Internal Server Error'})
            }
    else:
        # 他のHTTPメソッドの処理
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,DELETE'
            },
            'body': json.dumps({'message': 'Unsupported method'})
        }
