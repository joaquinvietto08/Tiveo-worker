import { View, Text, StatusBar, Pressable } from "react-native";
import { styles } from "./LoginStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Facebook from "../../../assets/svgs/auth/facebook";
import Google from "../../../assets/svgs/auth/google";
import { signInWithGoogle } from "../../actions/api/google_auth";
import { signInWithFacebook } from "../../actions/api/facebook_auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "@react-native-firebase/firestore";
import { colors } from "../../styles/globalStyles";

const Login = () => {
  const insets = useSafeAreaInsets();
  const db = getFirestore();

  const checkAndCreateClient = async (user) => {
    try {
      const clientRef = doc(db, "workers", user.uid);
      const clientSnapshot = await getDoc(clientRef);

      if (!clientSnapshot.exists) {
        await setDoc(clientRef, {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        });
        console.log("Trabajador creado en Firestore.");
      } else {
        console.log("Trabajador ya existe en Firestore.");
      }
    } catch (error) {
      console.error("Error al verificar o crear trabajador:", error);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((user) => {
        console.log(user);
        checkAndCreateClient(user.user);
      })
      .catch((error) => {
        alert("Sign in failed: " + error.message);
      });
  };

  const handleFacebookSignIn = () => {
    signInWithFacebook()
      .then((user) => {
        console.log("Signed in with Facebook!");
        checkAndCreateClient(user.user);
      })
      .catch((error) => {
        alert("Sign in failed: " + error.message);
      });
  };

  return (
    <View
      style={{
        ...styles.mainContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar
        translucent
        backgroundColor={colors.black}
        barStyle="light-content"
      />
      <View style={styles.container}>
        <Text style={styles.title}>Ingresa a tu cuenta</Text>
        <View style={styles.social_authContainer}>
          <Pressable
            style={styles.social_authButton}
            onPress={handleGoogleSignIn}
          >
            <Google />
            <Text style={styles.socialButtonText}>Continuar con Google</Text>
          </Pressable>
          <Pressable
            style={styles.social_authButton}
            onPress={handleFacebookSignIn}
          >
            <Facebook size={24} />
            <Text style={styles.socialButtonText}>Continuar con Facebook</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;
