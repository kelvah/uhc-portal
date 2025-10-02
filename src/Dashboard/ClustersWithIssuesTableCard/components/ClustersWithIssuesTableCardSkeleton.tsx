import React from 'react';

import { Flex, FlexItem, Skeleton } from '@patternfly/react-core';
import { Table, TableVariant, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

const ClustersWithIssuesTableCardSkeleton = () => (
  <>
    <Table aria-label="Cluster with issues table skeleton" variant={TableVariant.compact}>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th width={25} textCenter>
            Issues detected
          </Th>
          <Th screenReaderText="Cluster with issues actions" />
        </Tr>
      </Thead>
      <Tbody>
        {Array.from(Array(5).keys()).map((i) => (
          <Tr key={i}>
            <Td dataLabel="name">
              <Skeleton screenreaderText={`loading cluster with issues name ${i}...`} />
            </Td>
            <Td textCenter>
              <Skeleton screenreaderText={`loading cluster with issues total ${i}...`} />
            </Td>
            <Td isActionCell style={{ paddingRight: 0 }}>
              <Flex>
                <FlexItem align={{ default: 'alignRight' }}>
                  <Skeleton
                    shape="circle"
                    screenreaderText={`loading cluster with issues action ${i}...`}
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

export { ClustersWithIssuesTableCardSkeleton };
