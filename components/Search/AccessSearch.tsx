import React, { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import style from "../../styles/SearchSidebar.module.scss";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import { format, isValid, parse } from "date-fns";
import { GetRoles, RecentRole } from "../PROJECT/Access/Query";

export default function AccessSearch() {
    const [search, setSearch] = useState<string>("");
    const router = useRouter();
    const id: any = router.query.id;
    const { isLoading, isError, data } = GetRoles("");

    return (
        <div className={style.container}>
            <div className={style.header}>
                <aside className={style.title}>
                    <Link href="/project/corporate">
                        <a>
                            <MdArrowForwardIos className={style.arrow} />
                        </a>
                    </Link>
                    <h1>Project List</h1>
                </aside>

                {/* <aside className={style.searchBar}>
                    <div>
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        <BsSearch />
                    </div>
                </aside> */}
            </div>
            <div className=" overflow-y-auto">
                {isLoading ? (
                    <div className="flex justify-center py-5">
                        <BeatLoader
                            color={"#8f384d"}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                ) : (
                    data?.data.data.map((item: any, index: number) => (
                        <List key={index} item={item} />
                    ))
                )}
            </div>
        </div>
    );
}

const List = ({ item }: any) => {
    const date = parse(item.date, "yyyy-MM-dd", new Date());
    return (
        <Link href={`/project/access/${item.id}`}>
            <a className={style.searchedItem}>
                <ul>
                    <li>
                        <p>ID: {item.id}</p>
                        <p>{item.name}</p>
                    </li>
                </ul>
            </a>
        </Link>
    );
};
