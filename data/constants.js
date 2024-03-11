export const PAGE_SIZE = 5;
export const REGEX_SLUGIFY_EMAIL = /[*+~.()'"!:@]/g;

/*
 * next: { revalidate: 0 }, revalidate parameter for fetch cashing
 * Will revalidate every 1 moment
 * 60 1 moment
 * 60*60 = 3600 1 hour
 * */
export const SUCCESS_LIST_REVALIDATE_DURATION = 0;
