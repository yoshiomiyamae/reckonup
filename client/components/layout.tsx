import { NextComponentType } from "next";
import Head from "next/head";
import { User } from "../gql/types";
import Navigation from "./navigation";

interface LayoutProps {
    children: React.ReactNode;
    navigation?: string;
    title?: string;
    user?: User;
}

const Layout: NextComponentType<{}, {}, LayoutProps> = ({ children, navigation, title, user }) => <>
    <Head>
        <title>{title}</title>
    </Head>
    <Navigation navigation={navigation} user={user} />
    {children}
</>

export default Layout;