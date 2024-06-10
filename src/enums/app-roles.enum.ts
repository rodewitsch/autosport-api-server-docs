/**
 * AppRole enum:
 * - GUEST - Requests with this role don't check authentication
 * - USER - Requests with this role check if the user is authenticated
 * - DRIVER - Requests with this role check if the user is authenticated and has a driver_id
 * - ORGANIZER - Requests with this role check if the user is authenticated and has an organizer_ids array
 */
export enum AppRole {
  /** Requests with this role don't check authentication */
  GUEST = 'guest',
  /** Requests with this role check if the user is authenticated */
  USER = 'user',
  /** Requests with this role check if the user is authenticated and has a driver_id */
  DRIVER = 'driver',
  /** Requests with this role check if the user is authenticated and has an organizer_ids array */
  ORGANIZER = 'organizer',
}
