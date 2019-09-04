class ResponseCulquiModel {
  object: string;
  id: string;
  type: string;
  creation_date: number;
  email: string;
  card_number: string;
  last_four: string;
  active:boolean
  iin: object;
  client: object;
  metadata: object;
  user_message: string;
  merchant_message: string;
}

export default ResponseCulquiModel;
