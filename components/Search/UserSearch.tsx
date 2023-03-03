import React, { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import style from "../../styles/SearchSidebar.module.scss";
import api from "../../util/api";
import { useQuery } from "react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import BeatLoader from "react-spinners/BeatLoader";
import { GetUserRecent } from "../PROJECT/user/Query";
import { UserDetail } from "../PROJECT/user/UserTable";

export default function CorporateSearch() {
    const [search, setSearch] = useState<string>("");
    const router = useRouter();
    const id: any = router.query.id;

    const { isLoading, data, isError } = GetUserRecent(id, search);

    return (
        <div className={style.container}>
            <div className={style.header}>
                <aside className={style.title}>
                    <Link href="/project/user">
                        <a>
                            <MdArrowForwardIos className={style.arrow} />
                        </a>
                    </Link>
                    <h1>User</h1>
                </aside>

                <aside className={style.searchBar}>
                    <div>
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => {
                                setSearch((text) => (text = e.target.value));
                            }}
                        />
                        <BsSearch />
                    </div>
                </aside>
            </div>
            <div className=" overflow-y-auto">
                {data?.data.map((item: UserDetail, index: number) => (
                    <Link key={index} href={`/admin/property/${item?.id}`}>
                        <a className={style.searchedItem}>
                            <ul>
                                <li>
                                    <h4>{item?.name}</h4>
                                    <p className=" break-words">
                                        {item?.email}
                                    </p>
                                </li>
                                <li>
                                    <p>ID: {item?.id}</p>
                                    <p>{item?.contact_no}</p>
                                </li>
                            </ul>
                        </a>
                    </Link>
                ))}
                {isLoading && (
                    <div className="flex justify-center py-5">
                        <BeatLoader
                            color={"#8f384d"}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                )}
                {isError && (
                    <div>
                        <h2>Error Something is wrong</h2>
                    </div>
                )}
            </div>
        </div>
    );
}
