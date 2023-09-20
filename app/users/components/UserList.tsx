'use client'

import { User } from "@prisma/client";
import UserBox from "./UserBox";

type UserListProps = {
    users: User[]
}

const UserList: React.FC<UserListProps> = ({users}) => {
    return (
        <aside className="
            fixed
            pb-20
            inset-y-0
            left-0
            border-r
            border-gray-200
            lg:block
            lg:left-20
            lg:pb-0
            lg:w-80
            overflow-y-auto
            block
            w-full
        ">
            <div className="px-5">
                <div className="flex-col">
                    {/* dont need flex-col */}
                    <div className="
                        text-2xl
                        font-bold
                        text-neutral-800
                        py-4
                        ">
                            People
                    </div>
                </div>

                {users.map((user) => (
                    <UserBox
                        key={user.id}
                        data={user}
                    />
                ))}
            </div>
        </aside>
    );
}

export default UserList;