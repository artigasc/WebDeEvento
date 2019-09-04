class ResponseModel {
  status: number;
  data: any[];
  message: string;
  constructor(status, data, message
  ) {
    this.status = status,
    this.data = data,
    this.message = message

  }
}

export default ResponseModel;
