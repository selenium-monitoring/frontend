import { Site } from "../site/site.model";

export const sites = [
    new Site(0, 'http://localhost/', new Date(), '10 * * * *', 3, "Success"),
    new Site(1, 'http://example.com/', new Date(), '20 * * 4 *', 5, "Error"),
    new Site(2, 'http://127.0.0.1/', new Date(), '5/10 * * * *', 1, "Success"),
    new Site(3, 'http://localhost/', new Date(), '* * 2 * *', 3, "Running"),
    new Site(4, 'http://example.com/', new Date(), '* 5 10 * *', 5, "Error"),
    new Site(5, 'http://127.0.0.1/', new Date(), '* * * * *', 1, "Success"),
    new Site(6, 'http://localhost/', new Date(), '5 8-20/2 6 2/10 3-5', 3, "Success"),
    new Site(7, 'http://example.com/', new Date(), '* * * * 6-7', 5, "Error"),
    new Site(8, 'http://127.0.0.1/', new Date(), '* 2 * 2 *', 1, "Success"),
    new Site(9, 'http://localhost/', new Date(), '* 2 10 * *', 3, "Success"),
    new Site(10, 'http://example.com/', new Date(), '5 * * * *', 5, "Error"),
    new Site(11, 'http://127.0.0.1/', new Date(), '* * * 4-8 7', 1, "Success"),
  ]