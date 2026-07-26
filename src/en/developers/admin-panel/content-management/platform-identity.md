---
layout: doc
---

# Platform Identity

This page gathers the site's global information — the values consumed in templates through `getAppInformationValue()` (see [Utilities](../../development/utilities#usecontent)) rather than defined in a section's data structure. It has three tabs: **Basic information**, **Branding**, and **Social networks**.

## Basic information

![Basic information](/images/screenshots/en/light/basic-information.png#light-only)
![Basic information](/images/screenshots/en/dark/basic-information.png#dark-only)

| Field | Description |
| --- | --- |
| Website name | Displayed name of the platform (`name` key). |
| Email | Main contact email address (`email` key). |
| Phone | Main contact phone number (`phone` key). |
| Address | Physical address (`address` key). |
| Postal code | Associated postal code (`postalCode` key). |
| Description | Short site presentation, translatable per language through the selector above the field (`description` key). |

## Branding

Tab dedicated to brand media and colors: logo, one-color logo, icon/favicon, one-color icon, and primary, secondary and accent colors (`logo`, `oneColorLogo`, `icon`, `oneColorIcon`, `primaryColor`, `secondaryColor`, `accentColor` keys). These values feed `appPrimaryColor`/`appSecondaryColor`/`appAccentColor`/`logo`/`icon` on the `useContent()` side.

## Social networks

One URL field per supported social network — only fill in the networks actually used by the site, an empty field does not display the corresponding icon in the Header/Footer:

```
facebook, twitter, instagram, whatsapp, linkedin, youtube, pinterest, snapchat,
tiktok, telegram, discord, reddit, tumblr, vimeo, twitch, github, dribbble,
behance, medium, stackOverflow, threads, messenger, playstore, appstore
```

::: tip For developers
These values can also be set from the command line through [`creopse base-info update`](../../resources/cli#creopse-base-info-alias-info) — useful for populating them automatically while integrating a template rather than going through this page manually.
:::

::: tip See also
An end-user–oriented version of this section exists in the [User Guide](../../../users/sections/content-management).
:::
