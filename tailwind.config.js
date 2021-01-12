module.exports = {
    purge: {
        enabled: true,
        content: ["./views/**/*.ejs"],
    },
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter"],
            },
            spacing: {
                84: "21rem",
            },
        },
    },
    variants: {},
    plugins: [],
};
