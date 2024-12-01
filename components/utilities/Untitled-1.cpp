#include<bits/stdc++.h>
#define ll long long int
using namespace std;
int main()
{
    int x[4][3]={{1,2,3},{4,5,6},{7,8,9},{10,11,12}};
    printf("%u %u %u",x+2,*(x+2),*(x+1)+3);
    return 0;
}