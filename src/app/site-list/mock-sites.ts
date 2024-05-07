import { Site } from "../site/site.model";

export const sites = [
    new Site('site_0', 'http://localhost/', new Date(), '10 * * * *', "Success"),
    new Site('site_1', 'http://example.com/', new Date(), '20 * * 4 *', "Error"),
    new Site('site_2', 'http://127.0.0.1/', new Date(), '5/10 * * * *', "Success"),
    new Site('site_3', 'http://localhost/', new Date(), '* * 2 * *', "Running"),
    new Site('site_4', 'http://example.com/', new Date(), '* 5 10 * *', "Error"),
    new Site('site_5', 'http://127.0.0.1/', new Date(), '* * * * *', "Success"),
    new Site('site_6', 'http://localhost/', new Date(), '5 8-20/2 6 2/10 3-5', "Success"),
    new Site('site_7', 'http://example.com/', new Date(), '* * * * 6-7', "Error"),
    new Site('site_8', 'http://127.0.0.1/', new Date(), '* 2 * 2 *', "Success"),
    new Site('site_9', 'http://localhost/', new Date(), '* 200 10 * *', "Unknown"),
    new Site('site_10', 'http://example.com/', new Date(), '5 * * * *', "Error"),
    new Site('site_11', 'http://127.0.0.1/', new Date(), '* * * 4-8 7', "Success"),
  ]