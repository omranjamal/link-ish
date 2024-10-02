![Linkish Icon](assets/enabled.png)

# Link-ish

[![Link-ish on Chrome Web Store Button](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png)](https://chromewebstore.google.com/detail/link-ish/aomealgaegaafnegknodnlpmihpjdkek)

This extension allows you to force a "fake link" (that was created using JS click handlers) to behave somewhat like a real link.

## Why?

> Don't you hate it when a site or web app has a link that looks like a link, responds like a link on hover, but once you click it, you realize it's not a link? 
> 
> When this happens, you can't open it in new tab even
> if you right click it. You can't even if you
> `Ctrl`+`Click` it.
>
> Blame JavaScript.

## Features

This is a WIP.

1. `Ctrl`+`Click` Opens a fake link in a new tab.

## Install

### Chrome Web Store

Install via the [Chrome Web Store](https://chromewebstore.google.com/detail/link-ish/aomealgaegaafnegknodnlpmihpjdkek)

[![Link-ish on Chrome Web Store Button](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/iNEddTyWiMfLSwFD6qGq.png)](https://chromewebstore.google.com/detail/link-ish/aomealgaegaafnegknodnlpmihpjdkek)

### Usage

Once you're on a web page like [Daraz](https://www.daraz.com.bd/), and you happen upon a "fake-link" made with JS:

1. invoke the "Link-ish" extension by clicking its icon.
2. `Ctrl`+`Click` the "fake-link"
3. ????
4. Profit.

### Development

#### Build Dependencies

```bash
# Assuming you use a debian based system (sorry to arch users)
sudo apt install zip jq
```

#### Install Unpacked (DEV MODE)

1. Clone this repository `git clone git@github.com:omranjamal/link-ish.git`
2. Open `chrome://extensions/` on Chrome
3. In the top-right corner, turn on Developer Mode.
4. Click the `Load Unpacked` button.
5. Navigate to the `link-ish` directory and select it.
6. Done.

#### Packaging

To package your build to submit to the Chrome Web Store use the following command.

```bash
pnpm run build:package
```

You should see a file with the name in the format `linkish-[VERSION].zip`

## Backstory

This extension was primarity created to make [Daraz](https://www.daraz.com.bd/)'s new update bahave.

## License

MIT