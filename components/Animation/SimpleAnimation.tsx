export const FadeSide = {
    initial: {
        opacity: 0,
        marginLeft: "-50px",
    },
    animate: {
        opacity: 1,
        marginLeft: 0,
        transition: {
            ease: "linear",
        },
    },
    exit: {
        opacity: 0,
        marginLeft: "-50px",
        transition: {
            ease: "linear",
        },
    },
};
export const StaggerSidebar = {
    initial: {
        marginLeft: "-50px",
    },
    animate: {
        marginLeft: "0",
        transition: {
            staggerChildren: 0.2,
            when: "beforeChildren",
        },
    },
    exit: {
        marginLeft: "-50px",
        transition: {
            staggerChildren: 0.2,
            staggerDirection: -1,
            when: "afterChildren",
        },
    },
};

export const flip = {
    initial: {
        rotateX: "90deg",
    },
    animate: {
        rotateX: 0,
        transition: { type: "spring", bounce: 0.5 },
    },
    exit: {
        rotateX: "90deg",
        transition: { type: "spring", bounce: 0 },
    },
};

export const ModalSideFade = {
    initial: {
        opacity: 0,
        marginLeft: "30px",
    },
    animate: {
        opacity: 1,
        marginLeft: 0,
    },
    exit: {
        opacity: 0,
        marginLeft: "-30px",
    },
};
export const FadeIn = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
};
export const FadeDown = {
    initial: {
        opacity: 0,
        y: -50,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
        },
    },
    exit: {
        opacity: 0,
        y: -50,
        transition: {
            duration: 0.2,
        },
    },
};
