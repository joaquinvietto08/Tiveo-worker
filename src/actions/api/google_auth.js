import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "@react-native-firebase/auth";

GoogleSignin.configure({
  webClientId:
    "1051392459652-4et3jq7cpc9vnnmgodsuholuut64q5eq.apps.googleusercontent.com", //"client_type": 3
});

export async function signInWithGoogle() {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  const { idToken } = await GoogleSignin.signIn();

  const googleCredential = GoogleAuthProvider.credential(idToken);

  return signInWithCredential(getAuth(), googleCredential);
}
