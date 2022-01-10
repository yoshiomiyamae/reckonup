import { NextPage } from "next";
import Link from "next/link";
import Auth from "../components/auth";

const Test: NextPage = () => {
    return <>
        <Auth>
            <h2>TEST</h2>
            <Link href="/test2">
                <a>test2</a>
            </Link>
        </Auth>
    </>
}

export default Test;