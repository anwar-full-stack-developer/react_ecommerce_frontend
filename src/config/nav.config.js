import env from "./../config/env.json";

const productBannerBaseUrl = env.REACT_APP_IMAGE_BASE_URL;
const productBasePath = "/products/?";
const buildCatUrl = (data) => {
    let n = [];
    data.forEach((d) => {
        n.push({ ...d, url: `${productBasePath}cat=${d.slug}` });
    });
    return n;
};
const buildBrandUrl = (data) => {
    let n = [];
    data.forEach((d) => {
        n.push({ ...d, url: `${productBasePath}brand=${d.slug}` });
    });
    return n;
};

const navbar = buildCatUrl([
    {
        title: "Electronics",

        slug: "electronics",
    },
    {
        title: "Automobiles",
        slug: "automobiles",
    },
    {
        title: "Baby & Toys",
        slug: "baby-and-toys",
    },
    {
        title: "Fitness sport",
        slug: "fitness-sport",
    },
    {
        title: "clothing",
        slug: "clothing",
    },
    {
        title: "Furnitures",
        slug: "furnitures",
    },
    {
        title: "Bags",
        slug: "bags",
    },
    {
        title: "Gym",
        slug: "gym",
    },
    {
        title: "Shoes",
        slug: "shoes",
    },
    {
        title: "More",
        slug: "more",
        attrId: "nabbar-dropdown-more",
        children: buildCatUrl([
            { title: "Foods and Drink", slug: "foods-and-drink" },
            { title: "Home interior", slug: "home-interior" },
            { title: "Sports", slug: "sports" },
            { title: "Hardware", slug: "hardware" },
            { title: "Software", slug: "software" },
        ]),
    },
]);

const footerBrandNav = buildBrandUrl([
    { title: "Adidas", slug: "adidas" },
    { title: "Puma", slug: "puma" },
    { title: "Reebok", slug: "reebok" },
    { title: "Nike", slug: "nike" },
]);

const footerAccountNav = [
    { title: "User Login", slug: "user-login", url: "/login" },
    { title: "User Register", slug: "user-register", url: "/register" },
    {
        title: "Account Setting",
        slug: "account-setting",
        url: "/myaccount-settings",
    },
    { title: "My Orders", slug: "my-orders", url: "/myaccount-order-history" },
    { title: "My Wishlist", slug: "my-wishlist", url: "/myaccount-wishlist" },
];

const footerCompanyNav = [
    { title: "About us", slug: "aboutus", url: "/aboutus" },
    { title: "Career", slug: "career", url: "/career" },
    { title: "Find a store", slug: "find-a-store", url: "/find-store" },
    {
        title: "Rules and terms",
        slug: "rules-and-terms",
        url: "/terms-and-conditions",
    },
    { title: "Sitemap", slug: "c", url: "/Sitemap" },
];
const footerHelpNav = [
    { title: "Contact us", slug: "contactus", url: "/contactus" },
    { title: "Money Refund", slug: "money-refund", url: "/money-refund" },
    { title: "Order Tracking", slug: "order-tracking", url: "/order-tracking" },
    { title: "Shipping Info", slug: "shipping-info", url: "/shipping-info" },
    { title: "Open dispute", slug: "open-dispute", url: "/open-dispute" },
];
const footerSocialNav = [
    {
        title: "Facebook",
        slug: "facebook",
        url: "/facebook",
        icon: "fab fa-facebook",
    },
    {
        title: "Twitter",
        slug: "twitter",
        url: "/twitter",
        icon: "fab fa-twitter",
    },
    {
        title: "Instagram",
        slug: "instagram",
        url: "/instagram",
        icon: "fab fa-instagram",
    },
    {
        title: "Youtube",
        slug: "youtube",
        url: "/youtube",
        icon: "fab fa-youtube",
    },
];
const homeBanerLeftNav = buildCatUrl([
    { title: "Best clothes", slug: "best-clothes" },
    { title: "Automobiles", slug: "automobiles" },
    { title: "Home Interior", slug: "home-interior" },
    { title: "Electronics", slug: "electronics" },
    { title: "Technologies", slug: "technologies" },
    { title: "Digital Goods", slug: "digital-goods" },
    {
        title: "More Items",
        slug: "more-items",
        children: buildCatUrl([
            { title: "Drinks", slug: "drinks" },
            { title: "Foods", slug: "foods" },
            { title: "Resturents", slug: "resturents" },
        ]),
    },
]);

const banners = [
    {title: "60% discount", url: `${productBannerBaseUrl}banners/banner2.jpg`},
    {title: "Women's summer collections", url: `${productBannerBaseUrl}banners/banner3.jpg`},
    {title: "Women's Styling", url: `${productBannerBaseUrl}banners/banner4.jpg`},
    {title: "Fashion", url: `${productBannerBaseUrl}banners/banner5.jpg`},
    {title: "Happy Shopping", url: `${productBannerBaseUrl}banners/banner6.png`},
];
export {
    navbar,
    footerBrandNav,
    footerAccountNav,
    footerCompanyNav,
    footerHelpNav,
    footerSocialNav,
    homeBanerLeftNav,
    banners
};
