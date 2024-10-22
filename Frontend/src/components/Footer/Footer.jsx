import { IconEmail, IconGithub } from "../../assets/icons";
import './foooter.css'

export function Footer() {
    return (
        <div className="copy">
            <span>© Copyright 2024 - Echo por Leonel Valenzuela</span>
            <ul className="links"><li>
                <a href="" aria-label="link github" target="_blank">
                    <IconGithub />
                </a>
            </li>
                <li>
                    <a href="mailto:leon.alberto4502@gmail.com">
                        <IconEmail />
                    </a>
                </li>
            </ul>
        </div>
    )
}
