import { CognitoUser } from 'amazon-cognito-identity-js';
import { deleteMannequin, getMannequins } from '../api/mannequins';
import { getSession } from './cognitoSession';

export async function deleteAccount(user: CognitoUser): Promise<void> {
    const session = await getSession(user);
    const token = session.getIdToken().getJwtToken();
    const mannequins = await getMannequins(token);
    // Keep the account usable for retrying if data cleanup fails.
    for (const mannequin of mannequins) {
        await deleteMannequin(token, mannequin.mannequinName);
    }
    await new Promise<void>((resolve, reject) => {
        user.deleteUser(error => error ? reject(error) : resolve());
    });
    user.signOut();
}
