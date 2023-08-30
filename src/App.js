import {Outlet} from "react-router-dom";

export default function App() {
    return (
        <>
            <div id="sidebar">
                <nav>
                    <ul>
                        <li>
                            <a href={`/chart`}>Chart</a>
                        </li>
                        <li>
                            <a href={`/about`}>About</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}