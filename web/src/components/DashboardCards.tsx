const DashboardCards = () => {
  const cards = [
    { title: "NID Responses", value: 15852, icon: "mdi-cart-outline" },
    { title: "Processed Requests", value: 956, icon: "mdi-currency-usd" },
    { title: "Sold Sims", value: 5210, icon: "mdi-cube-outline" },
    { title: "Distribution Permit", value: 20544, icon: "mdi-currency-btc" },
  ];

  return (
    <div className="row">
      {cards.map((card, index) => (
        <div key={index} className="col-md-6 col-lg-6 col-xl-3">
          <div className="mini-stat clearfix bg-primary">
            <span className="mini-stat-icon">
              <i className={`mdi ${card.icon}`} />
            </span>
            <div className="mini-stat-info text-right text-white">
              <span>{card.value}</span>
              {card.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
