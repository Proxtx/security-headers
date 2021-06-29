const fetch = require("node-fetch");

const headers = [
  {
    header: "X-Frame-Options",
    description:
      "The X-Frame-Options HTTP response header can be used to indicate whether or not a browser should be allowed to render a page in a <frame>, <iframe>, <embed> or <object>.",
  },
  {
    header: "Content-Security-Policy",
    description:
      "The HTTP Content-Security-Policy response header allows web site administrators to control resources the user agent is allowed to load for a given page.",
  },
  {
    header: "X-Content-Type-Options",
    description:
      "The X-Content-Type-Options response HTTP header is a marker used by the server to indicate that the MIME types advertised in the Content-Type headers should not be changed and be followed.",
  },
  {
    header: "Strict-Transport-Security",
    description:
      "The HTTP Strict-Transport-Security response header lets a web site tell browsers that it should only be accessed using HTTPS, instead of using HTTP.",
  },
  {
    header: "Referrer-Policy",
    description:
      "The Referrer-Policy HTTP header controls how much referrer information (sent via the Referer header) should be included with requests.",
  },
  {
    header: "Permissions-Policy",
    description:
      "The FeaturePolicy interface of the Feature Policy API represents the set of policies applied to the current execution context.",
  },
];

export const getHeaders = async (url) => {
  const result = await fetch(url);
  let headerData = {};
  let headersPassed = 0;

  for (let i in headers) {
    const headerValue = await result.headers.get(headers[i].header);
    headerData[headers[i].header] = {
      header: headers[i].header,
      value: headerValue,
      description: headers[i].description,
      passed: headerValue ? true : false,
    };
    headerValue ? headersPassed++ : false;
  }

  return {
    score: Math.round((headersPassed / headers.length) * 100),
    headers: headerData,
  };
};
