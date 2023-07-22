export const extractObject = (data: Array<any>, id: any) => {
  let price: Number = 0
  for (let i = 0; i < data.length; i++) {
    if (id?.front === data[i].personalizeId)
      price = Number(price) + Number(data[i].personalizePrice)

    if (id?.back === data[i].personalizeId)
      price = Number(price) + Number(data[i].personalizePrice)
  }

  return price
}