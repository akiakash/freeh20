const QRCode = require("qrcode");
const qs = require("qs");

exports.generateQRCode = async (req, res) => {
  const { url, additionalData } = req.body;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  // Serialize additionalData object to query string
  const encodedAdditionalData = qs.stringify(additionalData);
  const encodedUrl = `${url}?${encodedAdditionalData}`;

  try {
    const qrCodeData = await QRCode.toDataURL(encodedUrl);
    res.type("png").send(Buffer.from(qrCodeData.split(",")[1], "base64"));
  } catch (error) {
    res.status(500).send("Error generating QR code");
  }
};

exports.decodeQRCode = (req, res) => {
  const { encodedUrl } = req.query;

  if (!encodedUrl) {
    return res.status(400).send("Encoded URL is required");
  }

  try {
    const urlObj = new URL(decodeURIComponent(encodedUrl));
    const additionalData = qs.parse(urlObj.search.slice(1));

    res.json({
      url: urlObj.origin + urlObj.pathname,
      additionalData: additionalData,
    });
  } catch (error) {
    res.status(500).send("Error decoding URL");
  }
};
