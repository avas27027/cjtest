/**
 * Environments variables declared here.
 */

/* eslint-disable node/no-process-env */


export default {
  NodeEnv: (process.env.NODE_ENV ?? ''),
  Port: (process.env.PORT ?? 0),
  CookieProps: {
    Key: 'ExpressGeneratorTs',
    Secret: (process.env.COOKIE_SECRET ?? ''),
    // Casing to match express cookie options
    Options: {
      httpOnly: true,
      signed: true,
      path: (process.env.COOKIE_PATH ?? ''),
      maxAge: Number(process.env.COOKIE_EXP ?? 0),
      domain: (process.env.COOKIE_DOMAIN ?? ''),
      secure: (process.env.SECURE_COOKIE === 'true'),
    },
  },
  Jwt: {
    Secret: (process.env.JWT_SECRET ??  ''),
    Exp: (process.env.COOKIE_EXP ?? ''), // exp at the same time as the cookie
  },
  CJ: {
    username: (process.env.CJ_USERNAME ?? ''),
    password: (process.env.CJ_PASSWORD ?? '')
  },
  Paypal: {
    clientID: (process.env.PAYPAL_CLIENT_ID ?? ''),
    clientSecret: (process.env.PAYPAL_CLIENT_SECRET ?? '')
  },
  Server_Config: {
    /**
     * **Ideal for:** Product Sync Interval
     */
    syncIntervalMins: (Number(process.env.SERVER_SYNC_INTERVAL_MIN) ?? 0),
    /**
     * @description Margin before Expire Days ex: ExpireDay (15) - Margin (5)  = NewExpireDay (10)
     * 
     * @useCase **Ideal for:** Key Sync Margin 
     */
    syncMarginDays: (Number(process.env.KEY_SYNC_INTERVAL_DAY) ?? 0) 
  }
} as const;
