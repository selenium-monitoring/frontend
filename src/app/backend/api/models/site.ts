/* tslint:disable */

/**
 * Site object
 */
export interface Site {

  /**
   * Scheduling info in the format of crontab in linux
   */
  cron: string;

  /**
   * Date of creation
   */
  dateAdded: string;

  /**
   * Result of the latest run
   */
  lastResult: 'Success' | 'Error' | 'Unknown' | 'Running';

  /**
   * name of the site
   */
  name: string;

  /**
   * URL list where the tests are ran
   */
  urls: Array<string>;
}
