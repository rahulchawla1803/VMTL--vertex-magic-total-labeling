#include <iostream>
#include<stdlib.h>

using namespace std;
void add();
void printMat(int arr[][1000]);
int n,i,j,a,b,x=1, ct=0, maxx;
int matrix[1000][1000]={0};
int vmtl[1000][1000]={0};
int main()
{
char ch;
cout<<"Enter the number of vertices(odd only)\n";
cin>>n;
if(n%2==0)
{
    cout<<"\nNumber is even\n";
    exit(0);
}
a=b=i=j=0;
maxx=n*(n+1)/2;
while(ct<maxx){
        ct++;
add();
}

for(a=0;a<n;a++)
{
    for(b=0;b<n;b++)
    {
        if(matrix[a][b]==0)
        {
            matrix[a][b]=matrix[b][a];
        }
       // cout<<matrix[a][b]<<"\t";
    }
    //cout<<endl;
}
//printMat(matrix);

a=0;
b=0;
i=0;
j=0;

while(a<n)
{
    vmtl[0][a]=matrix[a][a];
    a++;
}

for(b=0;b<n;b++)
{
    i=0;
    for(a=1;a<n;a++)
    {
        if(i==j)i++;

            vmtl[a][b]=matrix[i][j];

        i++;
    }
    j++;
}
printMat(vmtl);
cout<<"\nPress a character to view sum of each column\n";
cin>>ch;
int sum;
for(i=0;i<n;i++)
{
    sum=0;
    for(j=0;j<n;j++)
    {
        sum=sum+vmtl[j][i];

    }
    cout<<sum<<"\t";
}
cout<<endl<<endl<<"Magic constant is "<<sum<<endl;

}

void add(){

if(matrix[i][j]==0)
{
    matrix[i][j]=x;
    x++;
    i=(i+1)%n;
    j=(j+1)%n;
}
else{
 i=(i+1)%n;
 //j=(j-1)%n;
 j--;
 if(j<0)j=n+j;
 matrix[i][j]=x;
 x++;
 i=(i+1)%n;
 j=(j+1)%n;

}
}

void printMat(int arr[][1000])
{

    for(a=0;a<n;a++)
{
    for(b=0;b<n;b++)
    {

        cout<<arr[a][b]<<"\t";
    }
    cout<<endl;
}

}
