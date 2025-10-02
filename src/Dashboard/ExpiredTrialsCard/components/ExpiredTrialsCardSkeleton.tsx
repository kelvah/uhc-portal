import React from 'react';

import { Flex, FlexItem, Skeleton } from '@patternfly/react-core';
import { Table, TableVariant, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

const ExpiredTrialsCardSkeleton = () => (
  <>
    <Table aria-label="expired trials table skeleton" variant={TableVariant.compact}>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th screenReaderText="expired trials actions" />
        </Tr>
      </Thead>
      <Tbody>
        {Array.from(Array(5).keys()).map((i) => (
          <Tr key={i}>
            <Td dataLabel="name">
              <Skeleton screenreaderText={`loading expired trials name ${i}...`} />
            </Td>
            <Td isActionCell style={{ paddingRight: 0 }}>
              <Flex>
                <FlexItem align={{ default: 'alignRight' }}>
                  <Skeleton
                    shape="circle"
                    screenreaderText={`loading expired trials action ${i}...`}
                    width="10px"
                  />
                </FlexItem>
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
    <Skeleton style={{ marginTop: 'var(--pf-v5-global--spacer--md)' }} />
  </>
);

export { ExpiredTrialsCardSkeleton };
