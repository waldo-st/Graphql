const query = `
query {
  user:user{
    campus
    attrs
    auditRatio
    totalDown
    totalUp
    totalXp:transactions_aggregate(where:{type:{_eq:"xp"} _and:{event:{path:{_eq:"/dakar/div-01"}}}}){
      aggregate{
        sum{
          amount
        }
      }
    }
    level:transactions(where:{type:{_eq:"level"} _and:{event:{path:{_eq:"/dakar/div-01"}}}} order_by:{type:desc amount:desc} limit:1){
      amount
    }
    skill:transactions(where:{type:{_ilike:"skill_%"} object:{type:{_eq:"project"}}} order_by:[{type:desc} {amount:desc }] distinct_on:[type]){
      type
      amount
    }
    xpByProjet:transactions(where:{type:{_eq:"xp"} object:{type:{_eq:"project"}}} order_by:{type:asc createdAt:asc}){
      amount
      createdAt
      object{
        name
      }
    }
  }
}`;
export default query;
