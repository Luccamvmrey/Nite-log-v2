import {ThemeProvider} from "@/modules/common/components/ThemeProvider.tsx";
import {Route} from "wouter";

import Auth from "@/modules/auth/Auth.tsx";
import Home from "@/modules/home/Home.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import UserProfile from "@/modules/user/UserProfile.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import QrCodeScanner from "@/modules/qr-scanner/QrCodeScanner.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <Route path="/">
                    <Auth/>
                </Route>
                <Route path="/home">
                    <Home/>
                </Route>
                <Route path="/user">
                    <UserProfile/>
                </Route>
                <Route path="/qr-reader">
                    <QrCodeScanner/>
                </Route>
                <Toaster className="absolute top-8"/>
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App
