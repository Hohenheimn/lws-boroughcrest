import { GetServerSideProps, GetServerSidePropsContext } from "next";

export function requiredAuthentication(gssp: GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        const { req } = context;
        if (req.headers.cookie) {
            const token = req.headers.cookie.replace("user=", "");
            if (!token) {
                return {
                    redirect: {
                        permanent: false,
                        destination: "/login",
                    },
                };
            }
        } else {
            return {
                redirect: {
                    permanent: false,
                    destination: "/login",
                },
            };
        }
        return await gssp(context);
    };
}
