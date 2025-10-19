import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

const transactions = [
  {
    amount: -4000,
    type: "deposit" as const,
    date: "2022-03-03",
  },
  {
    amount: 400,
    type: "deposit" as const,
    date: "2022-03-02",
  },
  {
    amount: 3150.56,
    type: "deposit" as const,
    date: "2022-03-01",
  },
  {
    amount: 500,
    type: "withdrawal" as const,
    date: "2022-03-01",
  },
  {
    amount: 3000,
    type: "deposit" as const,
    date: "2022-02-28",
  },
  {
    amount: 1500,
    type: "deposit" as const,
    date: "2022-03-01",
  },
  {
    amount: 0,
    type: "withdrawal" as const,
    date: "2022-02-20",
  },
];

const textStyles = {
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "16px",
  letterSpacing: "-0.2px",
  color: "gray.400",
};

function WalletBalanceGraph() {
  const chartData = useMemo(() => {
    const byDate = transactions.reduce(
      (acc, transaction) => {
        const { date, type, amount } = transaction;

        if (!acc[date]) {
          acc[date] = {
            date,
            deposits: 0,
            withdrawals: 0,
          };
        }

        if (type === "deposit") {
          acc[date].deposits += amount;
        }

        if (type === "withdrawal") {
          acc[date].withdrawals += amount;
        }

        return acc;
      },
      {} as Record<
        string,
        {
          date: string;
          deposits: number;
          withdrawals: number;
        }
      >
    );

    let runningBalance = 0;

    return Object.values(byDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((entry) => {
        runningBalance += entry.deposits - entry.withdrawals;

        return {
          label: new Date(entry.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          net: Number(runningBalance.toFixed(2)),
        };
      });
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap="20px">
      <Box height="240px">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ left: 0, right: 0 }}>
            <defs>
              <linearGradient
                id="netBalanceGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="var(--chakra-colors-white)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="var(--chakra-colors-white)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(value) => {
                if (typeof value === "number") {
                  return [
                    `USD ${value.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`,
                    "Net",
                  ];
                }

                return [value, "Net"];
              }}
              labelFormatter={(label) => label}
            />
            <Area
              type="monotone"
              dataKey="net"
              stroke="var(--chakra-colors-orange-300)"
              strokeWidth={1}
              fill="url(#netBalanceGradient)"
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>

      <Box display="flex" flexDirection="column" gap="16px">
        <Box position="relative" width="100%">
          <Box
            left="0"
            width="6px"
            height="6px"
            rounded="100px"
            bg="gray.100"
            position="absolute"
            top="0"
            transform="translateY(-50%)"
          ></Box>
          <Box width="100%" height="1px" bg="gray.100"></Box>
          <Box
            right="0"
            width="6px"
            height="6px"
            rounded="100px"
            bg="gray.100"
            position="absolute"
            top="0"
            transform="translateY(-50%)"
          ></Box>
        </Box>

        <Flex justifyContent="space-between" alignItems="center">
          <Text {...textStyles}>Apr 1 , 2022</Text>
          <Text {...textStyles}>Apr 30 , 2022</Text>
        </Flex>
      </Box>
    </Box>
  );
}

export default WalletBalanceGraph;
