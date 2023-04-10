import { View, StyleSheet, Text, Pressable } from "react-native";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const paymentIcons = [
  <Icon name="payments" size={22} color={COLORS.primary} />,
  <Icon name="local-atm" size={22} color={COLORS.primary} />,
  <Icon name="credit-card" size={22} color={COLORS.primary} />,
];

const PaymentList = ({ items, onChangePayment, activePayment }) => {
  let payments = items;
  payments = payments.map((item, index) => {
    return { icon: paymentIcons[index], ...item };
  });

  const handleChangePayment = (idPayment) => {
    onChangePayment(idPayment);
  };

  return (
    <View style={styles.paymentContainer}>
      {payments.map((item, index) => (
        <Pressable
          key={index}
          onPress={handleChangePayment.bind(this, item.id_payment)}
        >
          <View
            style={{
              borderColor:
                activePayment === item.id_payment
                  ? COLORS.green
                  : "transparent",
              ...styles.paymentItem,
            }}
          >
            {item.icon}
            <Text style={styles.paymentName}>{item.name}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  paymentContainer: {
    height: 180,
  },
  paymentItem: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: COLORS.fadeYellow,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 4,
    borderWidth: 2,
  },
  paymentName: {
    color: COLORS.black,
    fontSize: 16,
    marginLeft: 10,
  },
});

export default PaymentList;
