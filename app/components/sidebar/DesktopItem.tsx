'use client'

import clsx from "clsx";
import Link from "next/link";

type DesktopItemProps = {
    label: string,
    href: string,
    icon: any,
    onClick?: () => void
    active?: boolean
}

const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    href,
    icon: Icon,
    active,
    onClick
}) => {
    const handleClick = () => {
        if(onClick) {
            return onClick()
        }
    }
    return (
        <li onClick={handleClick}>
            <Link
                href={href}
                className={clsx(`
                    group
                    flex
                    gap-x-3
                    rounded-md
                    p-3
                    text-sm
                    leading-6
                    font-semibold
                    text-gray-500
                    hover:text-black
                    hover:bg-gray-200
                `,
                    active && 'bg-gray-200 text-gray-950'
                )
            }
            >
                <Icon className="h-6 w-6 shrink-0"/>
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    );
}

export default DesktopItem;