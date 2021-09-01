class CreateReceipt {
  constructor(order_number, order_line_number, quantity, unit_of_measure, to_organization_id, to_organization, comments, type, file_id, distribution_number) {

    this.order_number = order_number;
    this.order_line_number = order_line_number
    this.quantity = quantity
    this.unit_of_measure = unit_of_measure
    this.to_organization_id = to_organization_id
    this.to_organization = to_organization
    this.comments = comments
    this.type = type
    this.file_id = file_id
    this.distribution_number = distribution_number
  }
}

module.exports = CreateReceipt;
