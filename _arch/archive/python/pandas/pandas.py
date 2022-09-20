pd.set_option("display.max_rows", 50)

pd.options.display.max_colwidth = 140

df = df.drop(columns="days")

df = pd.merge(df, counts, on="model")

df = df.sort_values("count", ascending=False)

random.randint(0, n)

np.percentile(total_errors, 75)

df.corr()

df.dtypes

df.count()

df.describe()

df.isna().sum()

df.columns

df = df[df.country != ""]

df["model"].value_counts()

len(df.maker.unique())

df["model"].fillna("missing")

bs = df.groupby("model").filter(lambda x: len(x) >= 10)

for index, row in df.iterrows():
    df.at[index, "power"] = power

df["year"] = df["year"].fillna(0)

df["year"] = df["year"].astype(int)

df = df.rename(columns={"days_on_market": "days"})

df.isnull().sum()

len(df.model.unique())

df.drop_duplicates(inplace=True)

df[pd.to_numeric(df["id"], errors="coerce").notnull()]

df = pd.get_dummies(df, columns=["type"])

df.model.mode()

df["month"] = df.Departure_YMD_LMT.map(lambda date: int(str(date)[4:6]))

df.describe()

df.columns

df.count()

df.apply(pd.value_counts)[:10]

df["SWC_Baggage"] = df["Passenger_Baggage_Count"].map(lambda x: 0 if x is 0 else 1)

df["is_1"] = df["Operation_Count"].map(lambda x: 1 if x is 1 else 0)

df.drop(["Passenger_Baggage_Count"], axis=1, inplace=True)

re.findall(r"\d+", str)

random.choice(list(dict.items()))

os.listdir("../input")
