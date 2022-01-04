/**
 * 
 * This file contains variables, that are environment specific
 * 
 * production; true/false; true = running in production, false=not running in production; default from angluar
 * stripe_key: place holder for the stripe key - is replace with gitlab-ci.yml on production
 * env_mail: contains a prefix that might be needed, e.g. in development "http://localhost:8011/" to access the php services on nginx server
 * 
 */

export const environment = {
  production: true,
  stripe_key: '@@COMETA_STRIPE_PUBLIC_KEY@@',
  env_mailurl: '',
  stripe_domain: 'prod'
};
