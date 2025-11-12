import { 
    createContext, 
    useEffect, 
    useState, 
    type ReactNode, 
    type FC, 
    type Dispatch, 
    type SetStateAction 
} from "react";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    onAuthStateChanged, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile,
    GoogleAuthProvider,
    type Auth,
    type User,
    type UserCredential
} from "firebase/auth";
import Swal from 'sweetalert2';
import app from "../firebase/firebase.config";

// --- Type Definitions ---

/**
 * Defines the shape of the data provided by the AuthContext.
 */
export interface IAuthContext {
    createUser: (email: string, password: string) => Promise<UserCredential>;
    signInUser: (email: string, password: string) => Promise<UserCredential>;
    forgotPassword: (email: string) => Promise<void>;
    createUserByGoogle: () => Promise<UserCredential>;
    SignOutUser: () => Promise<void>;
    updateUser: (updatedData: { displayName?: string; photoURL?: string }) => void;
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    loginToast: () => void;
    registerToast: () => void;
    logOutToast: () => void;
    BookConsultation: (name: string) => void;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
}

/**
 * Defines the props for the AuthProvider component.
 */
interface AuthProviderProps {
    children: ReactNode;
}

// --- Context Initialization ---

// Create the context with a default value.
// We use 'as IAuthContext' to assert the type, 
// assuming the Provider will always be used.
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const auth: Auth = getAuth(app);
const provider = new GoogleAuthProvider();

// --- AuthProvider Component ---

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const createUser = (email: string, password: string): Promise<UserCredential> => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email: string, password: string): Promise<UserCredential> => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const forgotPassword = (email: string): Promise<void> => {
       return sendPasswordResetEmail(auth, email);
    }

    const createUserByGoogle = (): Promise<UserCredential> => {
        return signInWithPopup(auth, provider);
    }

    const updateUser = (updatedData: { displayName?: string; photoURL?: string }): void => {
        if (auth.currentUser) {
            updateProfile(auth.currentUser, updatedData)
                .then(() => {
                    // Profile updated successfully
                    // You might want to update the user state here if needed
                    if (updatedData.displayName || updatedData.photoURL) {
                        setUser(prevUser => prevUser ? { ...prevUser, ...updatedData } : null);
                    }
                })
                .catch((error) => {
                    console.error("Error updating profile: ", error);
                });
        } else {
            console.warn("No user is currently signed in to update.");
        }
    }

    const SignOutUser = (): Promise<void> => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    // --- Toast Notifications ---

    const loginToast = (): void => {
        Swal.fire({
            title: "Login Successful! 🎉",
            text: "Welcome back!",
            icon: "success",
            confirmButtonText: "Continue",
            customClass: {
                confirmButton: "bg-green-700 text-white font-semibold hover:bg-green-800",
            },
        });          
    };

    const registerToast = (): void => {
        Swal.fire({
            title: "Successfully Registered!",
            text: `Thank You ! `,
            icon: "success",
            confirmButtonText: "Continue",
        });
    }

    const logOutToast = (): void => {
        Swal.fire({
            title: "Log Out Successful!",
            text: `Thank You!`,
            icon: "success",
            confirmButtonText: "Continue",
        });
    }

    const BookConsultation = (name: string): void => {
        Swal.fire({
            title: "Successfully Booked!",
            text: `Thank You, ${name} !`,
            icon: "success",
            confirmButtonText: "Continue",
        });
    }

    // --- Context Value ---

    const authData: IAuthContext = {
        createUser,
        signInUser,
        forgotPassword,
        createUserByGoogle,
        SignOutUser,
        updateUser,
        user,
        setUser,
        loading,
        setLoading,
        loginToast,
        registerToast,
        logOutToast,
        BookConsultation,
        email, 
        setEmail
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;