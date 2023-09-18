'use client'

import clsx from "clsx";
import Link from "next/link";

type MobileItemProps = {
    label: string,
    href: string,
    icon: any,
    onClick?: () => void
    active?: boolean
}

const MobileItem: React.FC<MobileItemProps> = ({
    href,
    icon: Icon,
    label,
    active,
    onClick
}) => {

    const handleClick = () => {
        if(onClick) {
            return onClick()
        }
    }

    return (
        <Link
            href={href}
            onClick={onClick}
            className={clsx(`
                group
                flex
                justify-center
                gap-x-3
                text-sm
                leading-6
                font-semibold
                w-full
                p-4
                text-gray-500
                hover:text-black
                hover:bg-gray-200
            `,
                active && 'bg-gray-200 text-gray-950'
            )}
        >
            <Icon className="h-6 w-6"/>
        </Link>
    );
}

export default MobileItem;