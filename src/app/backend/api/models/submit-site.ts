/* tslint:disable */
export interface SubmitSite {
  cron?: string;

  /**
   * Base64 encoded .side file
   */
  file?: string;

  /**
   * the image of the selenium test runner
   */
  image?: string;

  /**
   * valid name for the site
   */
  name?: string;

  /**
   * the repository from where the image is pulled from
   */
  repository?: string;

  /**
   * number of retries before failing the test
   */
  retries?: number;

  /**
   * optional tag for the image
   */
  tag?: string;
}
