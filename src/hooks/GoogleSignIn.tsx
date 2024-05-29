import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth, UserCredential } from "firebase/auth";

const useSignInWithGoogle = () => {
  const [user, setUser] = useState<UserCredential | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      setUser(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return [signInWithGoogle, user, loading, error] as const;
};

export default useSignInWithGoogle;
