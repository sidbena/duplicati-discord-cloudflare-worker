# Duplicati + Discord Cloudflare Workers

If you want to send notifications from your (self-hosted) [Duplicati](https://duplicati.com/) instance to Discord, then you can deploy this Cloudflare worker to your Cloudflare account. It modifies the incoming Duplicati data and sends an embed message to a Discord webhook URL.

## Instructions

1. Deploy this Cloudflare worker to your account
1. Create a webhook URL for a given Discord channel

   It will be in the following format:

   ```shell
   https://discord.com/api/webhooks/123/abcdef
   ```

   Copy the `123/abcdef` portion to your clipboard.

1. Open your Duplicati dashboard and select **"Edit"** on the backup you wish to receive notifications for. Navigate to **"Options"** and under **"Advanced options"** click the three dots to **"Edit as text"**.

   Add the `--send-http-json-urls` flag with your URL as following:

   ```text
   --send-http-json-urls=https://url-to-your-worker.com/123/abcdef
   ```

1. Save the backup configuration. Run a backup and check if it's working.
