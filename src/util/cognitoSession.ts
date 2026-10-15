import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';

export function getSession(user: CognitoUser): Promise<CognitoUserSession> {
    // The SDK refreshes expired tokens in getSession when a refresh token is available.
    return new Promise((resolve, reject) => {
        user.getSession((error: Error | null, session: CognitoUserSession | null) => {
            if (error || !session?.isValid()) {
                reject(new Error('セッションを確認できません。再ログインしてください。'));
            } else {
                resolve(session);
            }
        });
    });
}
