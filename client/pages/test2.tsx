import { NextPage } from "next";
import Link from "next/link";
import Auth from "../components/auth";

const Test: NextPage = () => {
    return <>
        <Auth>
            <h2>TEST2</h2>
            <Link href="/test">
                <a>test</a>
            </Link>
        </Auth>
    </>
}

export default Test;