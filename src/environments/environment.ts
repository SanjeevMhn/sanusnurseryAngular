// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  imgBBApikey: '014e008e82e884c8eb4215bf3b5ed463',
  refreshToken: 'http://localhost:8080/api/v1/refresh',
  baseUrl: 'http://localhost:8080/api/v1/products',
  authUrl: 'http://localhost:8080/api/v1/auth',
  orderUrl: 'http://localhost:8080/api/v1/orders',
  categoriesUrl: 'http://localhost:8080/api/v1/categories',
  googleClientId: '553771537351-h5lvslcp771roge0lli3l08oq1pntv1i.apps.googleusercontent.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
