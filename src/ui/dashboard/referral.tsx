import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import r1 from "../../../public/images/dashboard/r1.svg";

const ReferralList = [
  { id: 1, Name: "Your Referrals", Data: "0.00", Img: r1 },
  { id: 2, Name: "Your referral Earnings", Data: "0.00", Img: r1 },
  // { id: 3, Name: "Your left side earnings", Data: "0.00", Img: r1 },
  // { id: 4, Name: "Your right side earnings", Data: "0.00", Img: r1 },
  // { id: 5, Name: "Your self earning", Data: "0.00", Img: r1 },
  // { id: 6, Name: "Your eligible rewards", Data: "0.00", Img: r1 },
];

const ReferralContainer = styled(Box)({
  background: "linear-gradient(180deg, #16A4D7, #034f894a)",
  padding: "1px",
  borderRadius: "12px",
  height: "100%",
});

const InnerContainer = styled(Box)({
  backgroundColor: "#000",
  borderRadius: "12px",
  padding: "1rem 0.3rem",
  height: "100%",
});

const ReferralItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "0.3rem 1rem",
  gap: "1rem",
});

const Referral = () => {
  return (
    <ReferralContainer>
      <InnerContainer>
        {ReferralList.map((item) => (
          <ReferralItem key={item.id}>
            <Box sx={{ backgroundColor: "transparent", display: "grid" }}>
              <Image src={item.Img} alt={item.Name} width={50} height={50} />
            </Box>
            <Box>
              <Typography color="#B4B3B4">{item.Name}</Typography>
              <Typography color="#fff" fontWeight={700} variant="h5">
                {item.Data}
              </Typography>
            </Box>
          </ReferralItem>
        ))}
      </InnerContainer>
    </ReferralContainer>
  );
};

export default Referral;
