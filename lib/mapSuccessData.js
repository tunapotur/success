export default function mapSuccessData(successData) {
  return successData.map((success) => ({
    id: success._id,
    date: success.date,
    header: success.header,
    detail: success.detail,
    userId: success.userId,
  }));
}
