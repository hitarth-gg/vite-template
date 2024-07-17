import { Box,Tabs, Text } from "@radix-ui/themes";
import TableSubmissions from "./TableSubmissions";
import { useSelector } from "react-redux";

export default function TabSubmissions() {

  const {
    problemsSolved,
    correctSubmissions,
    skippedSubmissions,
    isLoading,
    errorMsg,
  } = useSelector((store) => store.user);


  return (
    <div className="">
      <Tabs.Root defaultValue="qsolved">
        <Tabs.List>
          <Tabs.Trigger value="qsolved">Questions Solved</Tabs.Trigger>
          <Tabs.Trigger value="correct">Correct Submissions</Tabs.Trigger>
          <Tabs.Trigger value="skipped">Skipped Submissions</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="qsolved">
            <TableSubmissions data={correctSubmissions} />
          </Tabs.Content>

          <Tabs.Content value="correct">
            {/* <TableCorrect /> */}
          </Tabs.Content>

          <Tabs.Content value="skipped">
            <Text size="2">
              {/* <TableSkipped /> */}
            </Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </div>
  );
}
